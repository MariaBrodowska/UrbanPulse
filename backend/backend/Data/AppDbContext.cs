using Microsoft.EntityFrameworkCore;
using backend.Models;

namespace backend.Data;

public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    public DbSet<User> Users { get; set; }
    public DbSet<Role> Roles { get; set; }
    public DbSet<City> Cities { get; set; }
    public DbSet<Population> Populations { get; set; }
    public DbSet<MeterData> MeterData { get; set; }
    public DbSet<InterestRate> InterestRates { get; set; }
    public DbSet<TypeOfInterestRate> TypeOfInterestRates { get; set; }
    
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        
        // Konfiguracja relacji
        modelBuilder.Entity<User>()
            .HasOne(u => u.Role)
            .WithMany(r => r.Users)
            .HasForeignKey(u => u.RoleId);
            
        modelBuilder.Entity<MeterData>()
            .HasOne(m => m.City)
            .WithMany(c => c.MeterData)
            .HasForeignKey(m => m.CityId);
            
        modelBuilder.Entity<Population>()
            .HasOne(p => p.City)
            .WithMany(c => c.Populations)
            .HasForeignKey(p => p.CityId);
            
        modelBuilder.Entity<InterestRate>()
            .HasOne(i => i.TypeOfInterestRate)
            .WithMany(t => t.InterestRates)
            .HasForeignKey(i => i.TypeOfInterestRateId);
    }
}