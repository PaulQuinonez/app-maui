using companias_crud.models;
using companias_crud.Services;

namespace companias_crud.Pages;

public partial class AddPage : ContentPage
{
    // instancacion de la clase Company service
    private readonly CompanyService _companyService = new();

    public AddPage()
    {
        InitializeComponent();
    }

    // funcion que guarda informacion a la base de datos
    private async void OnSubmitButtonClicked( object sender , EventArgs e )
    {
        var data = new ICompany
        {
            Nombre = nombreEntry.Text ,
            Direccion = direccionEntry.Text ,
            Telefono = long.Parse( telefonoEntry.Text )
        };

        await _companyService.AddCompany( data );
    }
}