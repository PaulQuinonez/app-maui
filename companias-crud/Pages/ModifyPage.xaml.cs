using companias_crud.models;
using companias_crud.Services;

namespace companias_crud.Pages;

public partial class ModifyPage : ContentPage
{
    //instanciacion de la clase de compa�ia
    private readonly CompanyService _companyService = new();
    private readonly ICompany _data = new();

    public ModifyPage()
    {
        InitializeComponent();
    }

    private async void SubmitHandle( object sender , EventArgs e )
    {
        try
        {
            //la informacion de los inputs se guardan en el modelo ICompany
            _data.Id = idEntry.Text;
            if ( nombreEntry.Text != "" )
                _data.Nombre = nombreEntry.Text;

            if ( direccionEntry.Text != "" )
                _data.Direccion = direccionEntry.Text;

            if ( telefonoEntry.Text != "" &&
                 long.TryParse( telefonoEntry.Text , out var telefono ) )
                _data.Telefono = telefono;

            await _companyService.UpdateCompany( _data! );
            await Navigation.PopAsync();
        }
        catch ( Exception ex )
        {
            Console.WriteLine( $"NullReferenceException occurred: {ex.Message}" );
        }
    }
}