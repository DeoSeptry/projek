// Self-check aturan aksi per kelas. Jalankan: node src/components/student/gradeAction.check.mjs
import assert from "node:assert/strict";
import { FINAL_GRADE } from "../../schemas/teacher/teachers.schema.js";

// Cerminan logika di StudentsTable: kelas 6 hanya luluskan, kelas 1-5 hanya naik kelas.
const isFinalGrade = (teacherGrade) => Number(teacherGrade) === FINAL_GRADE;
const allows = (teacherGrade, action) =>
  action === "graduate" ? isFinalGrade(teacherGrade) : !isFinalGrade(teacherGrade);

// Kelas 1-5: boleh naik kelas, tidak boleh diluluskan.
for (const grade of [1, 2, 3, 4, 5]) {
  assert(allows(grade, "promote"), `kelas ${grade} harus bisa naik kelas`);
  assert(!allows(grade, "graduate"), `kelas ${grade} tidak boleh diluluskan`);
}

// Kelas 6: boleh diluluskan, tidak boleh naik kelas.
assert(allows(FINAL_GRADE, "graduate"), "kelas 6 harus bisa diluluskan");
assert(!allows(FINAL_GRADE, "promote"), "kelas 6 tidak boleh naik kelas");

// grade dari API bisa berupa string; perbandingan tetap benar.
assert(allows("6", "graduate"), "grade string '6' harus dianggap kelas akhir");
assert(allows("3", "promote"), "grade string '3' harus bisa naik kelas");

// Tepat satu aksi yang tersedia untuk setiap kelas.
for (const grade of [1, 2, 3, 4, 5, 6]) {
  const available = ["promote", "graduate"].filter((a) => allows(grade, a));
  assert.equal(available.length, 1, `kelas ${grade} harus punya tepat 1 aksi`);
}

console.log("OK: kelas 1-5 naik kelas, kelas 6 luluskan");
