using System.Net.Http.Headers;
using System.Net.Http.Json;
using companias_crud.models;

namespace companias_crud.Services;

public class CompanyService
{
    private readonly HttpClient _client = new();

    public CompanyService()
    {
        // propiedades que tendra el client http
        // la ip debe contener la ip local de tu PC y permita archivos json
        _client.BaseAddress = new Uri("http://192.168.100.49:3000/");
        _client.DefaultRequestHeaders.Accept.Clear();
        _client.DefaultRequestHeaders.Accept.Add(
            new MediaTypeWithQualityHeaderValue( "application/json" )
        );
    }

    //funcion para la obtencion de todas las compañias
    public async Task< List< ICompany > > GetCompany()
    {
        try
        {
            var response = await _client.GetAsync( "companias" );
            if ( !response.IsSuccessStatusCode ) return null;

            var json = await response.Content.ReadAsStringAsync();
            var company = ICompany.FromJson( json );
            return company;
        }
        catch ( Exception ex )
        {
            Console.WriteLine( ex.Message );
            return null;
        }
    }

    // funcion para añadir compañias
    public async Task< HttpContent > AddCompany( ICompany company )
    {
        try
        {
            var response = await _client.PostAsJsonAsync( "companias" , company );
            return !response.IsSuccessStatusCode ? null : response.Content;
        }
        catch ( Exception ex )
        {
            Console.WriteLine( ex.Message );
            return null;
        }
    }

    // funcion para eliminar la compañia por Id
    public async Task DeleteCompany( string id )
    {
        try
        {
            await _client.DeleteAsync( $"companias/{id}" );
        }
        catch ( Exception ex )
        {
            Console.WriteLine( ex.Message );
        }
    }

    // funcion para obtener una compañia por Id
    public async Task< ICompany > GetCompanyById( string id )
    {
        try
        {
            var response = await _client.GetAsync( $"companias/{id}" );
            if ( !response.IsSuccessStatusCode ) return null;

            var json = await response.Content.ReadAsStringAsync();
            var company = ICompany.JsonFrom( json );
            return company;
        }
        catch ( Exception ex )
        {
            Console.WriteLine( ex.Message );
            return null;
        }
    }

    // funcion para actualizar datos tanto parciales como totales segun la compañia
    public async Task< ICompany > UpdateCompany( ICompany company )
    {
        try
        {
            var response = await _client.PatchAsJsonAsync(
                $"companias/{company.Id}" , company );
            if ( !response.IsSuccessStatusCode ) return null;

            var json = await response.Content.ReadAsStringAsync();
            var newCompany = ICompany.JsonFrom( json );
            return newCompany;
        }
        catch ( Exception ex )
        {
            Console.WriteLine( ex.Message );
            return null;
        }
    }
}