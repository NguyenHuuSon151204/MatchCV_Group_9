namespace ApiRestFul.DTOs
{
    public class PersonalInfoDto
    {
        public string FullName { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Address { get; set; }
        public string Summary { get; set; }
        // Chuỗi ảnh base64 (data:image/png;base64,... phần sau "base64,")
        public string AvatarBase64 { get; set; }
        public string Position { get; set; }

        public string Website { get; set; }
    }
}