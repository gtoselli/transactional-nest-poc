/*
  Warnings:

  - You are about to drop the `Cart` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `InboxMessage` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `OutboxMessage` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Cart";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "InboxMessage";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "OutboxMessage";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "carts" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "customerName" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "incoming_messages" (
    "messageId" TEXT NOT NULL PRIMARY KEY
);

-- CreateTable
CREATE TABLE "outgoing_messages" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "message" TEXT NOT NULL
);
