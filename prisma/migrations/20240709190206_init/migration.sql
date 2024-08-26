-- CreateTable
CREATE TABLE "Captcha" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "answer" TEXT NOT NULL,
    "image" BLOB NOT NULL
);

-- CreateTable
CREATE TABLE "CountryFlag" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "image" BLOB NOT NULL,
    "country" TEXT NOT NULL
);
