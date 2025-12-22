import React from 'react';
import TeacherDetailPanel from './TeacherDetailPanel';
import StudentsTable from './StudentsTable';

export default function StudentsManagementLayout({ teacher }) {
  if (!teacher) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Left Side - Teacher Detail */}
      <div className="lg:col-span-4">
        <TeacherDetailPanel teacher={teacher} />
      </div>

      {/* Right Side - Students Table */}
      <div className="lg:col-span-8">
        <StudentsTable 
          teacherId={teacher.id} 
          teacherGrade={teacher.grade} 
        />
      </div>
    </div>
  );
}