package com.swp.repositories;

import com.swp.entities.PostApprovals;
import com.swp.entities.ReportType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface ReportTypeRepository extends JpaRepository<ReportType, Integer>, JpaSpecificationExecutor<ReportType> {

}