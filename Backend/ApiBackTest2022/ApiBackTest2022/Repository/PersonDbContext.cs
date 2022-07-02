using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using ApiBackTest2022.Models;
using Microsoft.Extensions.Configuration;

namespace ApiBackTest2022.Repository
{
    public partial class PersonDbContext : DbContext
    {
        public PersonDbContext()
        {
        }

        public PersonDbContext(DbContextOptions<PersonDbContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Ciudad> Ciudad { get; set; }
        public virtual DbSet<Comuna> Comuna { get; set; }
        public virtual DbSet<Persona> Persona { get; set; }
        public virtual DbSet<Region> Region { get; set; }
        public virtual DbSet<Sexo> Sexo { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            IConfigurationRoot configuration = new ConfigurationBuilder()
     .SetBasePath(AppDomain.CurrentDomain.BaseDirectory)
     .AddJsonFile("appsettings.json")
     .Build();

            if (!optionsBuilder.IsConfigured)
            {

              //optionsBuilder.UseSqlServer("Data Source=LAPTOP-S2HR5M5H\\SQLEXPRESS;Initial Catalog=PruebaTecnica;Persist Security Info=True;User ID=sa;Password=1234");

                optionsBuilder.UseSqlServer(configuration.GetConnectionString("ApiConexion"));
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Ciudad>(entity =>
            {
                entity.HasKey(e => new { e.RegionCodigo, e.Codigo });

                entity.Property(e => e.Nombre).IsUnicode(false);

                entity.HasOne(d => d.RegionCodigoNavigation)
                    .WithMany(p => p.Ciudad)
                    .HasForeignKey(d => d.RegionCodigo)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Ciudad_Region");
            });

            modelBuilder.Entity<Comuna>(entity =>
            {
                entity.HasKey(e => new { e.RegionCodigo, e.CiudadCodigo, e.Codigo });

                entity.Property(e => e.Nombre).IsUnicode(false);

                entity.HasOne(d => d.Ciudad)
                    .WithMany(p => p.Comuna)
                    .HasForeignKey(d => new { d.RegionCodigo, d.CiudadCodigo })
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Comuna_Ciudad");
            });

            modelBuilder.Entity<Persona>(entity =>
            {
                entity.Property(e => e.Id).HasDefaultValueSql("(newid())");

                entity.Property(e => e.ApellidoMaterno).IsUnicode(false);

                entity.Property(e => e.ApellidoPaterno).IsUnicode(false);

                entity.Property(e => e.Email).IsUnicode(false);

                entity.Property(e => e.Nombre)
                    .IsUnicode(false)
                    .HasComputedColumnSql("(CONVERT([varchar](95),(((rtrim(ltrim([ApellidoPaterno]))+' ')+isnull(rtrim(ltrim([ApellidoMaterno])),''))+', ')+rtrim(ltrim([Nombres])),(0)))");

                entity.Property(e => e.Nombres).IsUnicode(false);

                entity.Property(e => e.Run)
                    .IsUnicode(false)
                    .HasComputedColumnSql("(CONVERT([varchar],([dbo].[FormatInt]([RunCuerpo])+'-')+[RunDigito],(0)))");

                entity.Property(e => e.RunDigito)
                    .IsUnicode(false)
                    .IsFixedLength();

                entity.HasOne(d => d.SexoCodigoNavigation)
                    .WithMany(p => p.Persona)
                    .HasForeignKey(d => d.SexoCodigo)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Persona_Sexo");

                entity.HasOne(d => d.Comuna)
                    .WithMany(p => p.Persona)
                    .HasForeignKey(d => new { d.RegionCodigo, d.CiudadCodigo, d.ComunaCodigo })
                    .HasConstraintName("FK_Persona_Comuna");
            });

            modelBuilder.Entity<Region>(entity =>
            {
                entity.Property(e => e.Codigo).ValueGeneratedNever();

                entity.Property(e => e.Nombre).IsUnicode(false);

                entity.Property(e => e.NombreOficial).IsUnicode(false);
            });

            modelBuilder.Entity<Sexo>(entity =>
            {
                entity.Property(e => e.Codigo).ValueGeneratedNever();

                entity.Property(e => e.Letra)
                    .IsUnicode(false)
                    .IsFixedLength();

                entity.Property(e => e.Nombre).IsUnicode(false);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
