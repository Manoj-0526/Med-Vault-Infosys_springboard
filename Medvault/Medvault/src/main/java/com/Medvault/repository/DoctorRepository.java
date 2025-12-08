package com.Medvault.repository;

import com.Medvault.entity.Doctor;
import com.Medvault.entity.User;
import com.Medvault.entity.VerificationStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface DoctorRepository extends JpaRepository<Doctor, Long> {

    // used in AuthController: doctorRepository.findByUser(user)
    Optional<Doctor> findByUser(User user);

    // used in AdminController: doctorRepository.findByUser_Id(userId)
    Optional<Doctor> findByUser_Id(Long userId);

    // used to get approved/pending doctors
    List<Doctor> findByVerificationStatus(VerificationStatus status);
}
