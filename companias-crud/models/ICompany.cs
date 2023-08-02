using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using Newtonsoft.Json;

namespace companias_crud.models;

public partial class ICompany
{
    [ BsonId ]
    [ BsonRepresentation( BsonType.ObjectId ) ]
    [ JsonProperty( "_id" ) ]
    public virtual string Id { get; set; }

    [ JsonProperty( "nombre" ) ] public virtual string Nombre { get; set; }

    [ JsonProperty( "direccion" ) ] public virtual string Direccion { get; set; }

    [ JsonProperty( "telefono" ) ] public virtual long Telefono { get; set; }
}

public partial class ICompany
{
    public static List< ICompany > FromJson( string json )
    {
        return JsonConvert.DeserializeObject< List< ICompany > >( json );
    }


    public static ICompany JsonFrom( string json )
    {
        return JsonConvert.DeserializeObject< ICompany >( json );
    }
}

public static class Serialize
{
    public static string ToJson( this ICompany self )
    {
        return JsonConvert.SerializeObject( self );
    }
}