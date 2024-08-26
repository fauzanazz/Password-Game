/*
  Warnings:

  - You are about to drop the column `input` on the `Score` table. All the data in the column will be lost.
  - You are about to drop the column `timeelapsed` on the `Score` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Score" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "score" INTEGER NOT NULL,
    "mode" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Score_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Score" ("id", "mode", "score", "userId", "username") SELECT "id", "mode", "score", "userId", "username" FROM "Score";
DROP TABLE "Score";
ALTER TABLE "new_Score" RENAME TO "Score";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
