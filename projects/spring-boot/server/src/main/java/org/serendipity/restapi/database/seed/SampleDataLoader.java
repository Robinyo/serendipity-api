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
import org.springframework.stereotype.Component;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.Date;

@Component
@Slf4j
public class SampleDataLoader implements CommandLineRunner {
  
  @Autowired
  private AddressRepository addressRepository;
  
  @Autowired
  private IndividualRepository individualRepository;

  @Override
  public void run(String... args) throws Exception {
    
    log.info("Loading sample data ...");
    
    Timestamp timestamp = new Timestamp(System.currentTimeMillis());
    
    Party individualParty = Party.builder()
        .type(PartyType.INDIVIDUAL)
        .displayName("Rob Ferguson")
        .build();
    
    Date dateOfBirth = new SimpleDateFormat("dd/MM/yyyy").parse("01/11/1982");
    
    Individual individual = Individual.builder().party(individualParty)
        .title("Mr")
        .givenName("Robert")
        .middleName("James")
        .familyName("Ferguson")
        .honorific("")
        .salutation("Rob")
        .preferredName("Rob")
        .initials("R.J.")
        .dateOfBirth(dateOfBirth)
        .placeOfBirth("Tamworth")
        .gender("Male")
        .email("rob.ferguson@robferguson.org")
        .phoneNumber("(02) 6234 4321")
        .photoUrl("")
        .build();
    
    individualRepository.save(individual);
    
    Location location = Location.builder()
        .type(LocationType.ADDRESS)
        .displayName("PO Box 6100 Parliament House Canberra ACT 2600")
        .fromDate(timestamp)
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

  }
  
}

// https://github.com/spring-projects/spring-hateoas-examples/tree/master/spring-hateoas-and-spring-data-rest

/*

    // Auditable auditable = new Auditable();

    Location location = new Location();
    location.setType("Address");
    location.setFromDate(timestamp);
    location.setDisplayName("PO Box 6100 Parliament House Canberra ACT 2600");
  
*/
