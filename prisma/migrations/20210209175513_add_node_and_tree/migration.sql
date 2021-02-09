-- CreateTable
CREATE TABLE "Node" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT,
    "description" TEXT,
    "treeId" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tree" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "creatorId" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_NodeRelation" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_NodeRelation_AB_unique" ON "_NodeRelation"("A", "B");

-- CreateIndex
CREATE INDEX "_NodeRelation_B_index" ON "_NodeRelation"("B");

-- AddForeignKey
ALTER TABLE "Node" ADD FOREIGN KEY("treeId")REFERENCES "Tree"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tree" ADD FOREIGN KEY("creatorId")REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_NodeRelation" ADD FOREIGN KEY("A")REFERENCES "Node"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_NodeRelation" ADD FOREIGN KEY("B")REFERENCES "Node"("id") ON DELETE CASCADE ON UPDATE CASCADE;
