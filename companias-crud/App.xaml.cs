using companias_crud.Pages.PagesDetails;

namespace companias_crud;

public partial class App : Application
{
    public App()
    {
        InitializeComponent();
        MainPage = new FlyoutPageT();
    }
}