# Volman
Adjust volume levels with `pactl`, and trigger notifications

Requires `node`.

## Usage

### Adjust

```
adjust <sink> <amount> [<max>] [<notify>]
```

Adjust the volume of `sink` by `amount` percent (volume wont go above `max`, the default is 150). Disable notifications: `notify` parameter with value  `0`.

### Toggle

```
toggle <sink> [<notify>]
```

Mute/unmute `sink`. Disable notifications: `notify` parameter with value  `0`.
