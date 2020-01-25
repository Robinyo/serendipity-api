package org.serendipity.restapi.model;

import javax.persistence.Embeddable;
import javax.persistence.Temporal;

import java.util.Date;

import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;

import static javax.persistence.TemporalType.TIMESTAMP;

@Embeddable
public class Auditable {
  
  @CreatedBy
  private String createdBy;

  @CreatedDate
  @Temporal(TIMESTAMP)
  private Date createdAt;

  @LastModifiedBy
  private String updatedBy;
  
  @LastModifiedDate
  @Temporal(TIMESTAMP)
  private Date updatedAt;
  
}

// https://dzone.com/articles/spring-data-jpa-auditing-automatically-the-good-stuff
// https://github.com/njnareshjoshi/articles/tree/master/spring-data-jpa-auditing
