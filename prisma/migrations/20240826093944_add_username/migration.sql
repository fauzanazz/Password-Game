/*
  Warnings:

  - Added the required column `username` to the `Score` table without a default value. This is not possible if the table is not empty.

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
    "username" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Score_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Score" ("id", "input", "mode", "score", "timeelapsed", "userId") SELECT "id", "input", "mode", "score", "timeelapsed", "userId" FROM "Score";
DROP TABLE "Score";
ALTER TABLE "new_Score" RENAME TO "Score";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
