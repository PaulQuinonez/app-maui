using System.Collections.ObjectModel;
using companias_crud.models;
using companias_crud.Services;

namespace companias_crud.Pages;

public partial class MainPage : ContentPage
{
    //llamada del servicio donde estan las funciondes CRUD
    private readonly CompanyService _companyService = new();

    public MainPage()
    {
        InitializeComponent();
        BindingContext = this;
        GetAllCompany();
    }

    //observable para notificar si se elimina o se agrega una compañia
    public ObservableCollection< ICompany > Company { get; } = new();

    private async void GetAllCompany()
    {
        var companyData = await _companyService.GetCompany();
        foreach ( var company in companyData )
            Company.Add( new ICompany
            {
                Id = company.Id ,
                Nombre = company.Nombre ,
                Direccion = company.Direccion ,
                Telefono = company.Telefono
            } );
    }

    // metodo para ir a la vista de detalle de la compañia seleccionada
    private async void ListView_ItemSelected( object sender , SelectedItemChangedEventArgs e )
    {
        if ( e.SelectedItem is not ICompany company ) return;
        var result = await _companyService.GetCompanyById( company.Id );
        //se le pasa los parametros, que es mas que todo el Id de la compañia
        await Navigation.PushAsync( new CompanyDetail
        {
            BindingContext = result
        } );
    }

    //Accion para eliminar una compañia por medio de un swipe

    private async void SwipeItem_Invoked( object sender , EventArgs e )
    {
        if ( sender is not SwipeItem { BindingContext: ICompany item } ) return;
        await _companyService.DeleteCompany( item.Id );
        Company.Remove( item );
    }

    //Accion para ir a la vista modificar por medio de un swipe
    private async void SwipeItemModify( object sender , EventArgs e )
    {
        if ( sender is not SwipeItem { BindingContext: ICompany company } ) return;
        var result = await _companyService.GetCompanyById( company.Id );
        // se le pasa los parametros, que es mas que todo el Id de la compañia
        await Navigation.PushAsync( new ModifyPage
        {
            BindingContext = result
        } );
    }
}