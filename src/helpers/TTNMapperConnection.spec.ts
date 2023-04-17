import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

describe('Test TTNMapperConnection class', () => {
    test('Test inserting duplicate datapoint', async () => {
        const exampleDevice = await prisma.device.upsert({
            where: { deviceId: 'duplicate_test_001' },
            update: {},
            create: {
                deviceId: 'duplicate_test_001',
            },
        });

        const dataForExampleGPSDatapoint = {
            timestamp: new Date(2005, 1, 1),
            latitude: 333.0,
            longitude: 999.0,
            altitude: 1337.0,
            hdop: 0.0,
        };

        await prisma.deviceGPSDatapoint.deleteMany({ where: dataForExampleGPSDatapoint });

        await prisma.deviceGPSDatapoint.create({
            data: { ...dataForExampleGPSDatapoint, device: { connect: { deviceId: exampleDevice.deviceId } } },
        });

        expect(async () => {
            await prisma.deviceGPSDatapoint.create({
                data: { ...dataForExampleGPSDatapoint, device: { connect: { deviceId: exampleDevice.deviceId } } },
            });
        }).rejects.toThrowError();

        await prisma.deviceGPSDatapoint.deleteMany({ where: dataForExampleGPSDatapoint });
    });
});