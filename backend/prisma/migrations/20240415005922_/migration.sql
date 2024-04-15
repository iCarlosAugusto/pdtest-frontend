/*
  Warnings:

  - You are about to alter the column `spentHours` on the `Report` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - You are about to alter the column `estimatedHours` on the `Employee` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Report" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "description" TEXT NOT NULL,
    "employeeId" TEXT NOT NULL,
    "spentHours" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Report_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Report" ("createdAt", "description", "employeeId", "id", "spentHours") SELECT "createdAt", "description", "employeeId", "id", "spentHours" FROM "Report";
DROP TABLE "Report";
ALTER TABLE "new_Report" RENAME TO "Report";
CREATE TABLE "new_Employee" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "estimatedHours" INTEGER NOT NULL,
    "squadId" TEXT NOT NULL,
    CONSTRAINT "Employee_squadId_fkey" FOREIGN KEY ("squadId") REFERENCES "Squad" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Employee" ("estimatedHours", "id", "name", "squadId") SELECT "estimatedHours", "id", "name", "squadId" FROM "Employee";
DROP TABLE "Employee";
ALTER TABLE "new_Employee" RENAME TO "Employee";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
