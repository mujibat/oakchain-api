import app from './index';
import mongoose from 'mongoose';
import { logger } from './config';
import { AddressInfo } from 'net';
import { seedSuperAdmin, seedUsers } from './models/seed';

async function startApp() {
  try {
    await mongoose.connect(process.env.MONGO_URL as string);

    logger('connect:', 'connected to database');

    seedUsers();
    seedSuperAdmin();

    const server: any = app.listen(process.env.PORT || 5000, () => {
      const { port, address } = server.address() as AddressInfo;
      console.log(`Server is running on http://${address}:${port}`);
    });
  } catch (error: any) {
    logger('tried to start app', JSON.stringify(error.message));
    process.exit(1);
  }
}

startApp();
