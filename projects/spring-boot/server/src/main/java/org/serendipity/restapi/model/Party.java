package org.serendipity.restapi.model;

import lombok.Builder;
import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Builder
@Data
@Entity
public class Party {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @Column(name = "id", nullable = false)
  private long id;

  private String type; // "Individual" | "Organisation"

  private String displayName;

  @Embedded
  private Auditable auditable;

}

// @Version
// private long version;

// @Table(name = "Party")
