import * as DailyRotateFile from 'winston-daily-rotate-file';
import * as winston from 'winston';

/**
 * 导出一个默认函数，用于创建每日轮换传输
 * @param level
 * @param fileName
 */
export default function createDailyRotateTransport(
  level: string,
  fileName: string,
) {
  return new DailyRotateFile({
    level,
    dirname: 'logs',
    filename: `${fileName}`,
    datePattern: 'YYYY-MM-DD-HH',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14b',
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.simple(),
    ),
  });
}
