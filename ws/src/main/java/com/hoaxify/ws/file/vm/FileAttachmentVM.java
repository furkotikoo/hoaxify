package com.hoaxify.ws.file.vm;

import com.hoaxify.ws.file.FileAttachment;

import lombok.Data;

@Data
public class FileAttachmentVM {
	
	private String name;
	
	private String filetype;

	public FileAttachmentVM(FileAttachment fileAttachment) {
		this.setName(fileAttachment.getName());
		this.setFiletype(fileAttachment.getFileType());
	}
}
