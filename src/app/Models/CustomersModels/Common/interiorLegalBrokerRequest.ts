import { ProductionInformation } from './productionInformation';
import { BankAccountDelegate } from './bankAccountDelegate';
import { InteriorLegalRequest } from './../Request/InteriorLegalRequest/interiorLegalRequest';
import { brokerRequest } from "./brokerRequest";
import { LegalBasicInformation } from '../Legal/legalBasicInformation';
import { AddressDetails } from '../Individual/addressDetails';
import { IdentityDetails } from '../Individual/identityDetails';
import { LegalPeopleWithVotingRight } from './legalPeopleWithVoting';
import { StackeholdersInformation } from './stackHoldersInformation';
import { LegalFinancialDetail } from './legalFinancialDetail';
import { BankDetails } from '../Individual/bankeDetails';

export class InteriorLegalBrokerRequest extends brokerRequest{
  public legalbasicInformation?:LegalBasicInformation;
  public addressCollection?: Array<AddressDetails>;
  public identityCollection?: Array<IdentityDetails>;
  public bankAccountDelegateCollection?:Array<BankAccountDelegate>;
  public legalPeopleWithVotingRightCollection?:Array<LegalPeopleWithVotingRight>;

  public productionInformationCollection?:Array<ProductionInformation>;

  public financialDetail ?:LegalFinancialDetail=new LegalFinancialDetail;

  public stackeholdersInformationCollection?: Array<StackeholdersInformation>=new Array<StackeholdersInformation>();

  public bankAccountInformation?:BankDetails=new BankDetails;
  constructor() {
    super();

    this.legalbasicInformation=new LegalBasicInformation();
    this.addressCollection=new Array<AddressDetails>();
    this.identityCollection=new Array<IdentityDetails>();
    this.bankAccountDelegateCollection=new Array<BankAccountDelegate>();
    this.legalPeopleWithVotingRightCollection=new Array<LegalPeopleWithVotingRight>();
    this.financialDetail  =new LegalFinancialDetail;
    this.productionInformationCollection=new Array<ProductionInformation>();
    this.stackeholdersInformationCollection=new Array<StackeholdersInformation>();
    this.bankAccountInformation=new BankDetails;
  }
}
