-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_carts" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "customerName" TEXT NOT NULL,
    "locked" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_carts" ("customerName", "id") SELECT "customerName", "id" FROM "carts";
DROP TABLE "carts";
ALTER TABLE "new_carts" RENAME TO "carts";
PRAGMA foreign_key_check("carts");
PRAGMA foreign_keys=ON;
