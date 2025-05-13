function KeyValueFeature({ feature }: { feature: SectionFeatureKeyVal}) {
  return (
    <div className="flex items-center gap-3">
      {feature.icon && (
        <img
          src={feature.icon}
          alt="Feature icon"
          className="w-8 h-8 object-contain"
        />
      )}
      <div>
        {feature.key && (
          <span className="text-sm font-medium">{feature.key}: </span>
        )}
        <span>{feature.value}</span>
      </div>
    </div>
  );
}

export default KeyValueFeature;
