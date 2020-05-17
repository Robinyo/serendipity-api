package org.serendipity.restapi.database.seed;

import lombok.extern.slf4j.Slf4j;
import org.serendipity.restapi.repository.AddressRepository;
import org.serendipity.restapi.repository.IndividualRepository;
import org.serendipity.restapi.repository.OrganisationRepository;
import org.serendipity.restapi.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;

@Component
@Slf4j
@Order(Ordered.LOWEST_PRECEDENCE)
public class HouseOfRepresentatives implements CommandLineRunner {

  static final String PATH = "sample-data/SurnameRepsCSV.csv";

  static final int HONORIFIC = 0;
  static final int SALUTATION = 1;
  static final int POST_NOMINALS = 2;
  static final int SURNAME = 3;
  static final int FIRST_NAME = 4;
  static final int OTHER_NAME = 5;
  static final int PREFERRED_NAME = 6;
  static final int INITIALS = 7;
  static final int ELECTORATE = 8; // Electorate
  static final int POLITICAL_PARTY = 10;
  static final int SEX = 11;
  // static final int TITLE = 0; // Parliamentary Title,Ministerial Title

  @Autowired
  private AddressRepository addressRepository;

  @Autowired
  private IndividualRepository individualRepository;

  @Autowired
  private OrganisationRepository organisationRepository;

  @Autowired
  private RoleRepository roleRepository;

  @Override
  @Transactional
  public void run(String... args) throws Exception {

    log.info("Loading members of the House of Representatives ...");

    try {

      InputStream resource = new ClassPathResource(PATH).getInputStream();

      BufferedReader buffer = new BufferedReader(new InputStreamReader(resource));

      String line = buffer.readLine();

      log.info("Header: {}", line);

      while ((line = buffer.readLine()) != null && !line.isEmpty()) {

        // Note: No support for strings with embedded comma's, for example: "Commonwealth Parliament Offices, Suite 8"
        String[] fields = line.split(",");

        String displayName = fields[SURNAME] + ", " + fields[FIRST_NAME];

      }

      buffer.close();

      log.info("Loading members of the House of Representatives complete");

    } catch (NullPointerException e) {

      log.error("{}", e.getLocalizedMessage());
    }

  }

}
