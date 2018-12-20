const axios = require('axios')
const FormData = require('form-data');
const API_URL = process.env.BFF_URL
const ERROR_502 = 'Network Error'
const instance = axios.create();

instance.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  return Promise.reject(error);
});

const get = (path, params = {}, token) => {
  const searchParams = Object.keys(params).map(key => {
    return params[key] !== '' ? encodeURIComponent(key) + '=' + encodeURIComponent(params[key]) : ''
  }).filter(item => item !== '').join('&')
  return instance.get(`${API_URL}/${path}?${searchParams}`, {
    headers: {
      'skio-token': token
    }
  })
    .then(response => response.data)
    .catch(function (error) {
      handleError(error)
    });
}
exports.get = get

const post = (path, params, token = '') => {
  console.log("post form value is", params);
  let formData = new FormData();

  for (let filed in params) {
    formData.append(filed, params[filed]);
  }
  
  return instance({
      method: 'post',
      url: `${API_URL}/${path}`,
      data: formData,
      headers: {
        "skio-token": 'token',
        'Content-Type': formData.getHeaders()['content-type']
      }
    })
    .then(response => response.data)
    .catch(function (error) {
      handleError(error)
    });
}
exports.post = post

const put = (path, params) => {
  console.log('put form value is', params);
  return instance({
      method: 'put',
      url: `${API_URL}/${path}`,
      data: params,
      headers: {
        "skio-token": localStorage.getItem("skioToken"),
      }
    })
    .then(response => response.data)
    .catch(function (error) {
      handleError(error)
    });
}
exports.put = put

const del = (path, params) => {
  console.log('delete form value is', params);
  return instance({
      method: 'delete',
      url: `${API_URL}/${path}`,
      data: params,
      headers: {
        "skio-token": localStorage.getItem("skioToken"),
      }
    })
    .then(response => response.data)
    .catch(function (error) {
      handleError(error)
    });
}
exports.del = del

// axios download file https://github.com/axios/axios/issues/448
const exporter = (path, params = {}, fileName = '导出数据') => {
  const searchParams = Object.keys(params).map(key => {
    return encodeURIComponent(key) + '=' + encodeURIComponent(params[key])
  }).join('&')
  return instance.get(`${API_URL}/${path}?${searchParams}`, {
      responseType: 'blob',
      headers: {
        'skio-token': localStorage.getItem("skioToken"),
        'Accept': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      }
    })
    .then(response => response.data)
    .then(blob => {
      let url = window.URL.createObjectURL(blob);
      let a = document.createElement('a');
      a.href = url;
      a.download = `${fileName}.xlsx`;
      a.click();
      Promise.resolve(blob);
    })
    .catch(function (error) {
      handleError(error)
    });
}
exports.exporter = exporter



function handleError(error) {
  throw error
  if (error.response) {
    // console.log("Error Response", error.response);
    // checkReturnStatus(error.response)
    throw error.response
    // return error.response
  } else if (error.request) {
    console.log('KOA request error');
    
    // console.log("Request Error", error.request, error.message);
    if (error.message === ERROR_502) {
      // console.log(`服务器异常${error.message}`, 5)
      throw error.message
    }
  } else {
    console.log('Error', error.message);
  }
}


function checkReturnStatus(res) {
  let errors;
  console.log('koa bff checkReturnStatus', res.status);
  
  switch (res.status) {
    case 500:
      console.log("500错误");
      console.log('服务器内部错误', 5)
      errors = `${res.status}, ${res.statusText}`
      return res.data
    case 404:
      console.log("请求的资源不存在,请确认是否存在该资源!", 5)
      errors = `${res.status}, ${res.statusText}`
      return res.data
    case 400:
      const msg = res.data && res.data.msg
      console.log(msg || '请求的参数存在问题!', 5)
      errors = `${res.status}, ${res.statusText}`
      return res.data
    case 401:
      // console.log("登录会话过期,请重新登录", 5)
      throw res.data
    case 403:
      console.log("无权限访问", 5)
      errors = `${res.status}, ${res.statusText}`
      return res.data
    default:
  }
}


exports.cleanCookieWhenLogout = function cleanCookieWhenLogout() {
  localStorage.clear()
  window.location.href = '/login'
}
