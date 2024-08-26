/*
  Warnings:

  - Added the required column `mode` to the `Score` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bestScore` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Score" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "timeelapsed" INTEGER NOT NULL,
    "score" INTEGER NOT NULL,
    "input" TEXT NOT NULL,
    "mode" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Score_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Score" ("id", "input", "score", "timeelapsed", "userId") SELECT "id", "input", "score", "timeelapsed", "userId" FROM "Score";
DROP TABLE "Score";
ALTER TABLE "new_Score" RENAME TO "Score";
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "bestScore" INTEGER NOT NULL
);
INSERT INTO "new_User" ("id") SELECT "id" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
