namespace DIFECMS.Domain.ViewModel.Case
{
    public class CaseDocument
    {
        public Int64 id { get; set; }
        public Int64 caseId { get; set; }
        public Int32 doctypeid { get; set; }
        public string docTypeName { get; set; }
        public string filetype { get; set; }
        public string encryptionkey { get; set; }
        public string description { get; set; }
        public DateTime issuedate { get; set; }
        public Int64? Creator { get; set; }
        public int saveType { get; set; }
    }
}
