const { spawn } = require('child_process');

// 开始时间
const dataBegin = new Date();

// 启动子进程执行 npm run test
const child = spawn('npm', ['run', 'test'], {
  shell: true,
});

// 标准输出处理
child.stdout.on('data', (data) => {
  const output = data.toString();
  // 如果检测到特定字符串，计算耗时并终止子进程
  if (output.includes('Ran all test suites.')) {
    const dateEnd = new Date();
    console.log('Duration:', dateEnd - dataBegin, 'ms');
    child.kill();
  }
});

// 错误输出处理
child.stderr.on('data', (data) => {
  console.error('Error:', data.toString());
});

// 进程关闭时输出信息
child.on('close', (code) => {
  const dateEnd = new Date();
  console.log('Duration:', dateEnd - dataBegin, 'ms');
  console.log(`child process exited with code ${code}`);
});
