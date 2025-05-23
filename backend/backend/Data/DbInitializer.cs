namespace backend.Data;
using Microsoft.EntityFrameworkCore;
public class DbInitializer
{
    public static void Initialize(AppDbContext context)
    {
        context.Database.Migrate(); // stosuje migracje

        // if (context.Users.Any())
        //     return; // Baza już zawiera dane
        //
        // context.Users.Add(new User { Name = "Admin", Email = "admin@example.com" });
        // context.SaveChanges();
    }
}