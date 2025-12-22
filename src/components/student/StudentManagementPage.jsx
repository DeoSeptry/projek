import React, { useState } from 'react';

import TeacherCards from './TeacherCards';
import { useGetTeachersQuery } from '../../services/api/teachers.api';
import StudentsManagementLayout from './StudentsManagementLayout';

export default function StudentsManagementPage() {
  const [selectedTeacher, setSelectedTeacher] = useState(null);

  const { data: teachersData, isLoading } = useGetTeachersQuery();
  const teachers = teachersData?.items || [];

  const handleSelectTeacher = (teacher) => {
    setSelectedTeacher(teacher);
  };

  return (
    <div className="min-h-screen ">
        {/* Teacher Cards */}
          <TeacherCards
            teachers={teachers}
            isLoading={isLoading}
            selectedTeacher={selectedTeacher}
            onSelectTeacher={handleSelectTeacher}
          />


        {/* Students Management Layout */}
        {selectedTeacher && (
          <div id="students-section">
            <StudentsManagementLayout teacher={selectedTeacher} />
          </div>
        )}
    </div>
  );
}