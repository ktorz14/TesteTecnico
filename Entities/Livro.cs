using Dapper.Contrib.Extensions;

namespace Entities
{
    [Table("livro")]
    public class Livro
    {
        [Key]
        public int Id { get; set; }

        public string Title { get; set; }

        public string Author { get; set; }

        public int NumPage { get; set; }

    }
}
