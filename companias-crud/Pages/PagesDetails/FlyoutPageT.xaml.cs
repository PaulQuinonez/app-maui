using companias_crud.models;

namespace companias_crud.Pages.PagesDetails;

public partial class FlyoutPageT : FlyoutPage
{
    public FlyoutPageT()
    {
        InitializeComponent();
        // permite cambiar la seleccion del menu
        FlyoutPage.collectionView.SelectionChanged += SelectionChange;
    }

    //permite cambiar las vistas de navegacion
    private void SelectionChange( object sender , SelectionChangedEventArgs e )
    {
        var firstOrDefault = e?.CurrentSelection!.FirstOrDefault();
        if ( firstOrDefault is not FlyoutPageItem item ) return;
        try
        {
            var targetPage = ( Page ) Activator.CreateInstance( item.TargetType );
            Detail = new NavigationPage( targetPage );
            IsPresented = false;
        }
        catch ( Exception ex )
        {
            Console.WriteLine( $"Error creating page: {ex.Message}" );
        }
    }
}