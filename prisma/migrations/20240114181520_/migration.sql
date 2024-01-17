-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(255) NULL,
    `email` VARCHAR(255) NULL,
    `password` VARCHAR(255) NULL,
    `type` VARCHAR(2) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `serialNumber_device` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `number` VARCHAR(255) NULL,
    `user_id` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `patients` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `surname` VARCHAR(32) NOT NULL,
    `name` VARCHAR(32) NOT NULL,
    `chamber` VARCHAR(32) NOT NULL,
    `bed` VARCHAR(32) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `statistics_pulse` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `pulse` INTEGER NULL,
    `time` DATETIME NOT NULL,
    `patient_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users__patients` (
    `userId` INTEGER NOT NULL,
    `patientId` INTEGER NOT NULL,

    PRIMARY KEY (`userId`, `patientId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `serialNumber_device` ADD CONSTRAINT `serialNumber_device_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `statistics_pulse` ADD CONSTRAINT `statistics_pulse_patient_id_fkey` FOREIGN KEY (`patient_id`) REFERENCES `patients`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `users__patients` ADD CONSTRAINT `users__patients_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `users__patients` ADD CONSTRAINT `users__patients_patientId_fkey` FOREIGN KEY (`patientId`) REFERENCES `patients`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
