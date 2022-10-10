import { $log } from '@tsed/common';
import { PlatformExpress } from '@tsed/platform-express';
import QuestionServer from './Server';

async function bootstrap() {
  try {
    $log.debug('Start question server...');
    const platform = await PlatformExpress.bootstrap(QuestionServer, {});

    await platform.listen();
    $log.debug('Question server initialized');
  } catch (er) {
    $log.error(er);
  }
}

bootstrap();