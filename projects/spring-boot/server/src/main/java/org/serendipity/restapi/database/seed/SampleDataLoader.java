package org.serendipity.restapi.database.seed;

import lombok.extern.slf4j.Slf4j;
import org.serendipity.restapi.entity.Address;
import org.serendipity.restapi.entity.Individual;
import org.serendipity.restapi.entity.Location;
import org.serendipity.restapi.entity.Party;
import org.serendipity.restapi.repository.AddressRepository;
import org.serendipity.restapi.repository.IndividualRepository;
import org.serendipity.restapi.type.LocationType;
import org.serendipity.restapi.type.PartyType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.sql.Timestamp;
import java.util.HashSet;
import java.util.Set;

@Component
@Slf4j
public class SampleDataLoader implements CommandLineRunner {

  static final String PATH = "sample-data/allsenel.csv";

  static final int TITLE = 0;
  static final int SALUTATION = 1;
  static final int SURNAME = 2;
  static final int FIRST_NAME = 3;
  static final int OTHER_NAME = 4;
  static final int PREFERRED_NAME = 5;
  static final int INITIALS = 6;
  static final int POST_NOMINALS = 7;
  // static final int STATE = 8;
  // static final int POLITICAL_PARTY = 9;
  static final int GENDER = 10;
  // static final int ELECTORATE_TELEPHONE = 16;

  @Autowired
  private AddressRepository addressRepository;
  
  @Autowired
  private IndividualRepository individualRepository;

  @Override
  @Transactional
  public void run(String... args) throws Exception {

    log.info("Loading sample data ...");

    //
    // Parliament House Address
    //

    Timestamp currentTime = new Timestamp(System.currentTimeMillis());

    Location location = Location.builder()
        .type(LocationType.ADDRESS)
        .displayName("PO Box 6100 Parliament House Canberra ACT 2600")
        .fromDate(currentTime)
        .build();

    Address parliamentHouse = Address.builder()
        .location(location)
        .name("The Senate")
        .line1("PO Box 6100")
        .line2("Parliament House")
        .city("Canberra")
        .state("ACT")
        .postalCode("2600")
        .country("Australia")
        .addressType("Mailing")
        .build();

    addressRepository.save(parliamentHouse);

    Set<Address> addresses = new HashSet<Address>();
    addresses.add(parliamentHouse);

    try {

      InputStream resource = new ClassPathResource(PATH).getInputStream();

      BufferedReader buffer = new BufferedReader(new InputStreamReader(resource));

      String line = buffer.readLine();

      log.info("Header: " + line);

      while ((line = buffer.readLine()) != null && !line.isEmpty()) {

        // Note: No support for strings with embedded comma's, for example: "Commonwealth Parliament Offices, Suite 8"
        String[] fields = line.split(",");

        String displayName = fields[SURNAME] + ", " + fields[TITLE] + " " + fields[FIRST_NAME];

        Party individualParty = Party.builder()
            .type(PartyType.INDIVIDUAL)
            .displayName(displayName)
            .addresses(addresses)
            .build();

        String email = fields[FIRST_NAME].toLowerCase() + "." + fields[SURNAME].toLowerCase() + "@aph.gov.au";

        Individual individual = Individual.builder().party(individualParty)
            .title(fields[TITLE])
            .givenName(fields[FIRST_NAME])
            .middleName(fields[OTHER_NAME])
            .familyName(fields[SURNAME])
            .honorific(fields[POST_NOMINALS])
            .salutation(fields[SALUTATION])
            .preferredName(fields[PREFERRED_NAME])
            .initials(fields[INITIALS])
            .gender(fields[GENDER])
            .email(email)
            .phoneNumber("")
            .photoUrl("")
            .build();

        individualRepository.save(individual);

      }

      buffer.close();

    } catch (IOException | NullPointerException e) {
      log.error("Input stream could not be initialised");
    }

    log.info("Sample data loading complete");

  }
  
}

/*

import java.text.SimpleDateFormat;
import java.util.Date;

Date dateOfBirth = new SimpleDateFormat("dd/MM/yyyy").parse("01/11/1982");
.dateOfBirth(dateOfBirth)

*/


/*

    // Auditable auditable = new Auditable();

    Location location = new Location();
    location.setType("Address");
    location.setFromDate(timestamp);
    location.setDisplayName("PO Box 6100 Parliament House Canberra ACT 2600");
  
*/
