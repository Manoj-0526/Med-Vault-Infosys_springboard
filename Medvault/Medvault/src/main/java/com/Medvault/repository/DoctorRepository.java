package com.Medvault.repository;

import com.Medvault.entity.Doctor;
import com.Medvault.entity.VerificationStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface DoctorRepository extends JpaRepository<Doctor, Long> {

    Optional<Doctor> findByUser_Id(Long userId);

    List<Doctor> findByVerificationStatus(VerificationStatus status);
}
