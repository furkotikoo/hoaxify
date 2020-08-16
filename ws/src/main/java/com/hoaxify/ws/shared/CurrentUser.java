package com.hoaxify.ws.shared;

import static java.lang.annotation.ElementType.PARAMETER;
import static java.lang.annotation.RetentionPolicy.RUNTIME;

import java.lang.annotation.Retention;
import java.lang.annotation.Target;

import org.springframework.security.core.annotation.AuthenticationPrincipal;

@Target({ PARAMETER })
@Retention(RUNTIME)
@AuthenticationPrincipal
public @interface CurrentUser {

}
