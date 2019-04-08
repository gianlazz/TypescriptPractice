"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class FirstMigration1554327113424 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`CREATE TABLE "guitar" ("id" SERIAL NOT NULL, "userId" character varying NOT NULL, "brand" character varying NOT NULL, "model" character varying NOT NULL, "year" integer, "color" character varying, CONSTRAINT "PK_cda66a01dabadeebb230ca2d457" PRIMARY KEY ("id"))`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`DROP TABLE "guitar"`);
        });
    }
}
exports.FirstMigration1554327113424 = FirstMigration1554327113424;
//# sourceMappingURL=1554327113424-FirstMigration.js.map