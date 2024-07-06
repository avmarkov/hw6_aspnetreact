var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
var myCors = "MyCors";
builder.Services.AddCors(options=>
{
    options.AddPolicy(name: myCors,
        corsBuilder =>
        {
            corsBuilder.WithOrigins(builder.Configuration.GetSection("CORS:Origins").Get<string[]>())
            .WithHeaders(builder.Configuration.GetSection("CORS:Headers").Get<string[]>())
            .WithMethods(builder.Configuration.GetSection("CORS:Methods").Get<string[]>());
        });
});

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseCors(myCors);

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
