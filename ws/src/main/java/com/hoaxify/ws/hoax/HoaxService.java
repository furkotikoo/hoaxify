package com.hoaxify.ws.hoax;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Order;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.util.Streamable;
import org.springframework.stereotype.Service;

import com.hoaxify.ws.file.FileAttachment;
import com.hoaxify.ws.file.FileAttachmentRepository;
import com.hoaxify.ws.file.FileService;
import com.hoaxify.ws.hoax.vm.HoaxSubmitVM;
import com.hoaxify.ws.shared.GenericResponse;
import com.hoaxify.ws.user.User;
import com.hoaxify.ws.user.UserService;

@Service
public class HoaxService {
	
	HoaxRepository hoaxRepository;
	
	UserService userService;
	
	FileAttachmentRepository fileAttachmentRepository;
	
	FileService fileService;
	
	public HoaxService(HoaxRepository hoaxRepository, FileAttachmentRepository fileAttachmentRepository, FileService fileService, UserService userService) {
		this.hoaxRepository = hoaxRepository;
		this.fileAttachmentRepository = fileAttachmentRepository;
		this.fileService = fileService;
		this.userService = userService;
	}

	public void save(HoaxSubmitVM hoaxSubmitVm, User user) {
		Hoax hoax = new Hoax();
		hoax.setContent(hoaxSubmitVm.getContent());
		hoax.setTimestamp(new Date());
		hoax.setUser(user);
		hoaxRepository.save(hoax);
		Optional<FileAttachment> optionalFileAttachment = fileAttachmentRepository.findById(hoaxSubmitVm.getAttachmentId());
		if(optionalFileAttachment.isPresent()) {
			FileAttachment fileAttachment = optionalFileAttachment.get();
			fileAttachment.setHoax(hoax);
			fileAttachmentRepository.save(fileAttachment);
		}
	}

	public Page<Hoax> getHoaxes(Pageable page) {
		return hoaxRepository.findAll(page);
	}

	public Page<Hoax> getHoaxesOfUser(String username, Pageable page) {
		User inDB = userService.getByUsername(username);
		return hoaxRepository.findByUser(inDB, page);
	}

	public Page<Hoax> getOldHoaxes(long id, String username, Pageable page) {
		Specification<Hoax> specification = idLessThan(id);
		if(username != null) {			
			User inDB = userService.getByUsername(username);
			specification = specification.and(userIs(inDB)); // user ın sayfasındaki eski hoaxları listeler
		}
		return hoaxRepository.findAll(specification, page); // anasayfada eski hoax ları listeler
	}

	public long getNewHoaxesCount(long id, String username) {
		Specification<Hoax> specification = idGreaterThan(id);
		if(username != null) {			
			User inDB = userService.getByUsername(username);
			specification = specification.and(userIs(inDB));
		}
		return hoaxRepository.count(specification); // There are new hoaxes yazısının ekrana çıkmasını sağlıyor.
	}

	public List<Hoax> getNewHoaxes(long id, String username, Sort sort) {
		Specification<Hoax> specification = idGreaterThan(id);
		if(username != null) {			
			User inDB = userService.getByUsername(username);
			specification = specification.and(userIs(inDB));
		}
		return hoaxRepository.findAll(specification, sort); // There are new hoaxes yazısına tıkladığımızda yeni hoaxları ekranda listeler
	}
	
	
	Specification<Hoax> idLessThan(long id){
		return (root, query, criteriaBuilder) -> {
				return criteriaBuilder.lessThan(root.get("id"), id);
			};
	}
	
	Specification<Hoax> idGreaterThan(long id){
		return (root, query, criteriaBuilder) -> {
				return criteriaBuilder.greaterThan(root.get("id"), id);
			};
	}
	
	Specification<Hoax> userIs(User user){
		return (root, query, criteriaBuilder) -> {
			return criteriaBuilder.equal(root.get("user"), user);
		};
	}

	public void delete(long id) {
		Hoax inDB = hoaxRepository.getOne(id);
		if(inDB.getFileAttachment() != null) {
			String fileName = inDB.getFileAttachment().getName();
			fileService.deleteAttachmentFile(fileName);
		}
		hoaxRepository.deleteById(id);
	}
	
}
