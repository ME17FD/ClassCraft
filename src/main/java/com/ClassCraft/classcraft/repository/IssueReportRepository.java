package com.ClassCraft.classcraft.repository;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ClassCraft.classcraft.model.IssueReport;
import com.ClassCraft.classcraft.model.ReportStatus;

@Repository
public interface IssueReportRepository extends JpaRepository<IssueReport, Long> {
    List<IssueReport> findByStatus(ReportStatus status);
    List<IssueReport> findByClassroomId(Long classroomId);
    List<IssueReport> findByReporterId(Long reporterId);
}