import app from './index';
import mongoose from 'mongoose';
import { SAMSON_CONFIGS } from 'sm-pkjs/dist';
import { AddressInfo } from 'net';
import { seedSuperAdmin, seedUsers } from './models/helpers/seed';

async function startApp() {
  try {
    await mongoose.connect(SAMSON_CONFIGS.env.MONGO_URL as string);

    SAMSON_CONFIGS.logger('connect:', 'connected to database');

    seedUsers();
    seedSuperAdmin();

    const server: any = app.listen(SAMSON_CONFIGS.env.PORT || 5000, () => {
      const { port, address } = server.address() as AddressInfo;
      console.log(`Server is running on http://${address}:${port}`);
    });
  } catch (error: any) {
    SAMSON_CONFIGS.logger('tried to start app', JSON.stringify(error.message));
    process.exit(1);
  }
}

startApp();
