import fs from "fs";
import YAML from "yaml";
import { faker } from "@faker-js/faker";

const SWAGGER_PATH = "docs/swagger.yaml";

function genLoginExample() {
  return {
    email: faker.internet.email(),
    password: faker.internet.password({ length: 10 }),
  };
}
const raw = fs.readFileSync(SWAGGER_PATH, "utf-8");
const doc = YAML.parse(raw);
const loginContent = doc?.paths?.["/login"]?.post?.requestBody?.content?.["application/json"];
if (!loginContent) {
  console.error("Не найден /login POST requestBody content application/json --- проверь swagger.yaml");
  process.exit(1);
}

loginContent.example = genLoginExample();
fs.writeFileSync(SWAGGER_PATH, YAML.stringify(doc), "utf-8");
console.log("Готово! Example для POST /login записан в", SWAGGER_PATH);