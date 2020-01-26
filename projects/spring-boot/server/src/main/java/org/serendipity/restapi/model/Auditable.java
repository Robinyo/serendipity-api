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

// https://jira.spring.io/browse/DATACMNS-1274

// https://vladmihalcea.com/how-to-audit-entity-modifications-using-the-jpa-entitylisteners-embedded-and-embeddable-annotations/
// https://github.com/vladmihalcea/high-performance-java-persistence
