function drawGrid(strokeStyle, fillStyle) {
  controlContext.save() // 保存上下文(context)到栈(stack)中

  controlContext.fillStyle = fillStyle
  controlContext.strokeStyle = strokeStyle

  // 绘制格网图

  controlContext.restore() // 从栈中恢复上下文
}