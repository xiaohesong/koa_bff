const {get, put, post, exporter} = require('../../axios')

async function hunters(ctx) {
  const {query} = ctx
  const result = await get('v1/contracts', query, ctx.headers['skio-token'])
  ctx.status = 200
  ctx.body = result
}
exports.hunters = hunters

async function postHunters(ctx) {
  const result = await post('v1/contracts', ctx.request.body, ctx.headers['skio-token'])
  ctx.status = 200
  ctx.body = result
}
exports.postHunters = postHunters

async function show(ctx) {
  const result = await get(`/v1/contracts/${ctx.params.id}`, undefined, ctx.headers['skio-token'])
  ctx.body = result
  ctx.status = 200
}
exports.show = show

async function update(ctx) {
  const result = await put(`/v1/contracts/${ctx.params.id}`, ctx.request.body, ctx.headers['skio-token'])
  ctx.body = result
  ctx.status = 200
}
exports.put = update

var contentDisposition = require('content-disposition')
console.log('content is', contentDisposition)

const fs = require('fs')

async function toExport(ctx) {
  const filename = encodeURIComponent(ctx.query.filename || '导出数据')
  const result = await exporter(`v1/contracts/export`, ctx.query, ctx.headers['skio-token'])
  ctx.body = result
}
exports.export = toExport 