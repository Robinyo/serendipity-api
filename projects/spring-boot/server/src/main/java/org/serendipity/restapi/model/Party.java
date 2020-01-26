package org.serendipity.restapi.model;

import static javax.persistence.TemporalType.TIMESTAMP;

import java.util.Date;

import javax.persistence.Column;
// import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Temporal;

import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
@Entity
@EntityListeners(AuditingEntityListener.class)
public class Party {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @Column(name = "id", nullable = false)
  private long id;

  @Builder.Default
  private String type = "Party";

  @Builder.Default
  private String displayName = "";

  // @Embedded
  // private Auditable audit;
  
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

// type = "Individual" | "Organisation"

// @Version
// private long version;

// @Table(name = "Party")
